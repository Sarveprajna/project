import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Sidebar />
        <main className="flex-1 p-8">
          <Dashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App;