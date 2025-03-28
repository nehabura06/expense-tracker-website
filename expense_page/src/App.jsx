import React, { useState } from 'react';
import Modal from 'react-modal';
import Tesseract from 'tesseract.js';
import './App.css';

Modal.setAppElement('#root');

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    date: '',
    amount: '',
  });
  const [viewData, setViewData] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [modalMode, setModalMode] = useState('manual'); // 'manual', 'scan', 'voice'

  // ✅ FIXED: Modal now opens properly when clicking "Add Expense"
  const openModal = (index = null) => {
    if (index !== null && expenses[index]) {
      setFormData(expenses[index]);
      setEditingExpenseIndex(index);
    } else {
      setFormData({ description: '', category: '', date: '', amount: '' });
      setEditingExpenseIndex(null);
    }
    setModalMode('manual'); // Ensures default mode when opening modal
    setModalIsOpen(true);
    console.log("Modal opened");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingExpenseIndex(null);
    setModalMode('manual');
    setIsUploading(false);
    setPreviewUrl('');
  };

  const closeViewModal = () => setViewModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpenseIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingExpenseIndex] = formData;
      setExpenses(updatedExpenses);
    } else {
      setExpenses([...expenses, formData]);
    }
    closeModal();
  };

  const handleEdit = (index) => {
    openModal(index);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleView = (index) => {
    setViewData(expenses[index]);
    setViewModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setPreviewUrl(URL.createObjectURL(file));
      setModalMode('scan');

      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m),
        psm: 6
      });

      let text = result.data.text;
      console.log("Extracted Text:", text);

      const lines = text.split('\n');
      let amount = '';
      let description = '';
      let category = '';
      let date = '';

      lines.forEach(line => {
        let cleanedLine = line.trim()
          .replace(/[()]/g, '')
          .replace(/(\d+)o\b/gi, '$1' + '0')
          .replace(/o/g, '0');

        if (!description && line.match(/\d{1,5}\s+[A-Za-z]+\s+[A-Za-z]+/)) {
          description = cleanedLine;
        }

        const dateMatch = cleanedLine.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/);
        if (dateMatch) {
          date = formatDateForInput(dateMatch[0]);
        }

        if (/total due|total|amount|balance|due|subtotal|payment/i.test(cleanedLine.toLowerCase())) {
          const numbers = cleanedLine.match(/\b\d{1,4}(?:[.,]\d{2})?\b/g);
          if (numbers) {
            const validNumbers = numbers.map(num => parseFloat(num.replace(',', '')));
            const maxAmount = validNumbers.length ? Math.max(...validNumbers) : 0;
            if (maxAmount > 0) {
              amount = maxAmount.toFixed(2);
            }
          }
        }

        if (/food|coffee|restaurant|cake|meal|dinner|lunch|beverage|tax/i.test(cleanedLine.toLowerCase())) {
          category = "Food";
        } else if (/grocery|supermarket|mart|vegetables|fruits|store/i.test(cleanedLine.toLowerCase())) {
          category = "Grocery";
        } else if (/cinema|movie|ticket|theatre/i.test(cleanedLine.toLowerCase())) {
          category = "Movie Ticket";
        }
      });

      if (!category) {
        category = "Other";
      }

      setFormData({
        description: description || '',
        category: category || '',
        date: date || '',
        amount: amount || ''
      });

      setIsUploading(false);
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';

    const months = {
      january: '01', february: '02', march: '03', april: '04',
      may: '05', june: '06', july: '07', august: '08',
      september: '09', october: '10', november: '11', december: '12'
    };

    const parts = dateStr.split(' ');
    if (parts.length < 2) return '';

    let day = parts[0].replace(/(st|nd|rd|th)$/i, '');
    let month = months[parts[1].toLowerCase()];
    let year = parts[2] || new Date().getFullYear().toString();

    return `${year}-${month}-${day.padStart(2, '0')}`;
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;
    recognitionInstance.continuous = true;

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInterimText(interimTranscript);
      if (finalTranscript) {
        console.log("Voice Input:", finalTranscript);
        parseVoiceInput(finalTranscript);
        recognitionInstance.stop();
      }
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error detected:", event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended.");
      setIsListening(false);
    };

    recognitionInstance.start();
    setIsListening(true);
    setRecognition(recognitionInstance);
    setModalMode('voice');
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const parseVoiceInput = (transcript) => {
    let amount = '';
    let description = '';
    let category = '';
    let date = '';

    console.log("Voice Input:", transcript);

    const amountMatch = transcript.match(/\b(?:rs\.?|rupees)?\s?(\d{1,4}(?:[.,]\d{2})?)\b/i);
    if (amountMatch) {
      amount = parseFloat(amountMatch[1].replace(',', '')).toFixed(2);
    }

    const dateMatch = transcript.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s(january|february|march|april|may|june|july|august|september|october|november|december)(?:\s(\d{4}))?\b/i);
    if (dateMatch) {
      let day = dateMatch[1].padStart(2, '0');
      let month = {
        january: '01', february: '02', march: '03', april: '04',
        may: '05', june: '06', july: '07', august: '08',
        september: '09', october: '10', november: '11', december: '12'
      }[dateMatch[2].toLowerCase()];
      let year = dateMatch[3] || new Date().getFullYear();
      date = `${year}-${month}-${day}`;
    } else {
      const relativeDateMatch = transcript.match(/\b(today|yesterday|tomorrow)\b/i);
      if (relativeDateMatch) {
        let dateStr = relativeDateMatch[0];
        let today = new Date();
        if (dateStr === 'today') {
          date = today.toISOString().split('T')[0];
        } else if (dateStr === 'yesterday') {
          today.setDate(today.getDate() - 1);
          date = today.toISOString().split('T')[0];
        } else if (dateStr === 'tomorrow') {
          today.setDate(today.getDate() + 1);
          date = today.toISOString().split('T')[0];
        }
      }
    }

    if (/\b(food|coffee|restaurant|cake|meal|dinner|lunch|beverage|tax)\b/i.test(transcript)) {
      category = "Food";
    } else if (/\b(grocery|supermarket|mart|vegetables|fruits|store)\b/i.test(transcript)) {
      category = "Grocery";
    } else if (/\b(cinema|movie|ticket|theatre)\b/i.test(transcript)) {
      category = "Movie Ticket";
    } else {
      category = "Other";
    }

    const descriptionMatch = transcript.match(/\bon\s([a-zA-Z\s]+)/i);
    if (descriptionMatch) {
      description = descriptionMatch[1].trim();
    } else {
      description = transcript.split(' ')[0];
    }

    setFormData({
      description: description || '',
      category: category || '',
      date: date || '',
      amount: amount || ''
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setFilterCategory('');
    setFilterDate('');
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? expense.category === filterCategory : true;
    const matchesDate = filterDate ? expense.date === filterDate : true;
    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">BudgetBuddy</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
          <a href="#" className="block p-2 rounded bg-purple-100">Expenses</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Budgets</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Goals</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Scholarships</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Savings Challenges</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Reports</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-100">Settings</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <button onClick={() => openModal()} className="bg-purple-500 text-white px-4 py-2 rounded">
            Add Expense
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded flex-1"
          />
          <button onClick={resetSearch} className="bg-red-500 text-white px-2 py-1 rounded">
            Reset
          </button>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Movie Ticket">Movie Ticket</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Add / Edit Expense Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add/Edit Expense"
          ariaHideApp={false}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="w-96 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Expense</h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setModalMode('scan')}
                  className="flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.45 16.65a7 7 0 109.8 0L10 11a6 6 0 00-5.55 5.65z"></path>
                  </svg>
                  Scan Receipt
                </button>
                <button
                  type="button"
                  onClick={startListening}
                  className="flex items-center justify-center bg-gray-200 text-black px-4 py-2 rounded"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Voice Input
                </button>
              </div>
              {modalMode === 'manual' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          required
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Coffee at Starbucks"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Movie Ticket">Movie Ticket</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
                    Save Expense
                  </button>
                </form>
              )}
              {modalMode === 'scan' && (
                <div className="flex space-x-6">
                  <div className="w-1/2">
                    <form onSubmit={handleSubmit} className="p-4">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="border p-2 mb-2 w-full"
                    />
                     <div className="flex justify-end space-x-4 mt-4">
                    
                    <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
                      Save Expense
                    </button>
                  </div>
                    </form>
                  </div>
                  
                        {/* ✅ Right Side - Larger Image Preview with Correct Width */}
                        <div className="w-64 h-64 flex flex-col items-center justify-start border rounded-lg p-2 shadow bg-white">
                          <h3 className="text-sm font-medium mb-2">Preview:</h3>
                          {previewUrl ? (
                            <img src={previewUrl} alt="Receipt preview" className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center border rounded-lg bg-gray-100 text-gray-500">
                              No Preview Available
                            </div>
                          )}
                        </div>

                        
                </div>
              )}
              {modalMode === 'voice' && (
                <div className="space-y-4">
                  <div className="border p-2 mb-2 w-full bg-gray-100">
                    {interimText}
                  </div>
                  <form onSubmit={handleSubmit} className="p-4">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      className="border p-2 mb-2 w-full"
                    />
                    
                    <button
                      type="button"
                      onClick={isListening ? stopListening : startListening}
                      className="bg-green-500 text-white px-4 py-2 rounded mb-2 w-full"
                    >
                      {isListening ? "Stop Listening" : "Voice Input"}
                    </button>
                    {isListening && (
                      <div className="border p-2 mb-2 w-full bg-gray-100">
                        {interimText}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add Expense
                    </button>
                  </form>
                 
                </div>
              )}
            </div>
          </div>
        </Modal>

        {/* View Details Modal */}
        <Modal isOpen={viewModalOpen} onRequestClose={closeViewModal} contentLabel="View Expense Details" className="modal">
          {viewData && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Expense Details</h2>
              <p><strong>Description:</strong> {viewData.description}</p>
              <p><strong>Category:</strong> {viewData.category}</p>
              <p><strong>Date:</strong> {viewData.date}</p>
              <p><strong>Amount:</strong> {viewData.amount}</p>
              <button onClick={closeViewModal} className="bg-gray-500 text-white px-4 py-2 rounded mt-2">
                Close
              </button>
            </div>
          )}
        </Modal>

        {/* Expenses Table */}
        <div className="mt-4">
          {filteredExpenses.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr key={index}>
                    <td className="border p-2">{expense.description}</td>
                    <td className="border p-2">{expense.category}</td>
                    <td className="border p-2">{expense.date}</td>
                    <td className="border p-2">${expense.amount}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => handleView(index)} className="bg-gray-500 text-white px-2 py-1 rounded">
                        View
                      </button>
                      <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No expenses logged yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
