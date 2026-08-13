import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FAQItem {
  question: string;
  answer: string;
  category: 'shipping' | 'returns' | 'products' | 'orders';
}

const FAQ_LIST: FAQItem[] = [
  {
    category: 'shipping',
    question: 'How long does shipping take and what does it cost?',
    answer: 'Standard shipping takes 3-5 business days and is FREE on all US orders over $75. Express 2-day delivery is available at checkout for $9.99.',
  },
  {
    category: 'shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to over 120 countries worldwide with duties prepaid at checkout so there are no unexpected fees upon arrival.',
  },
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy. Items must be unworn, in original condition with tags attached. Return shipping labels are generated automatically.',
  },
  {
    category: 'returns',
    question: 'How fast are refunds processed?',
    answer: 'Refunds are issued to your original payment method within 2-3 business days after our distribution center receives your returned package.',
  },
  {
    category: 'products',
    question: 'Are all apparel items 100% organic?',
    answer: 'Yes! All hoodies, tees, and caps in the Google Merch Collection are made with GOTS-certified organic cotton and eco-conscious dyes.',
  },
  {
    category: 'orders',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders enter automated fulfillment quickly. You have 30 minutes post-purchase to edit or cancel your order via your confirmation email or by contacting live support.',
  },
];

export const ContactFaqPage: React.FC = () => {
  const { showToast } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<'all' | 'shipping' | 'returns' | 'products' | 'orders'>('all');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Support', message: '' });

  const filteredFaqs = selectedCat === 'all' ? FAQ_LIST : FAQ_LIST.filter((f) => f.category === selectedCat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      showToast('Please fill in your email and message', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent! We will reply within 2 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-blue-900/50">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support & Customer Service</span>
        </div>
        <h1 className="text-4xl font-black text-[#111827] dark:text-white tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Find quick answers to common questions about shipping, returns, and orders, or reach out directly to our Google Merch support team.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-400 rounded-2xl shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#111827] dark:text-white">Email Support</h4>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">support@googlemerch.com</p>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">Avg. response 2 hrs</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#111827] dark:text-white">Live Chat</h4>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">Available 24/7 in app</p>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">Instant Assistance</span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-200/80 dark:border-gray-800 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-2xl shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#111827] dark:text-white">Toll-Free Phone</h4>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">1-800-555-MERCH</p>
            <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400 mt-1 block">Mon-Fri 8am-8pm EST</span>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'shipping', label: 'Shipping' },
              { id: 'returns', label: 'Returns' },
              { id: 'products', label: 'Products' },
              { id: 'orders', label: 'Orders' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#6B7280] dark:text-gray-300 hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-xs sm:text-sm text-[#111827] dark:text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-200/80 dark:border-gray-800 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
            Direct Inquiry
          </span>
          <h2 className="text-3xl font-extrabold text-[#111827] dark:text-white">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
            Have a custom order request, corporate merch inquiry, or general question? Fill out the form and our support concierges will get back to you promptly.
          </p>

          <div className="pt-4 space-y-3 text-xs text-[#111827] dark:text-gray-200">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span>1600 Amphitheatre Pkwy, Mountain View, CA 94043</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Official Google Merchandise Operations</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-3xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">Message Received!</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Thank you for contacting us. A customer care representative will respond to <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-xs rounded-full cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111827] dark:text-gray-200">Your Name</label>
                  <input
                    type="text"
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-white placeholder:text-gray-400 rounded-2xl text-xs focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111827] dark:text-gray-200">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-white placeholder:text-gray-400 rounded-2xl text-xs focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#111827] dark:text-gray-200">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-white rounded-2xl text-xs focus:outline-none focus:border-[#2563EB]"
                >
                  <option>General Support</option>
                  <option>Order Tracking & Delivery</option>
                  <option>Returns & Exchanges</option>
                  <option>Corporate Bulk Orders</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#111827] dark:text-gray-200">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#111827] dark:text-white placeholder:text-gray-400 rounded-2xl text-xs focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
