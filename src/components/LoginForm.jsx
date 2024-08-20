import { useState } from 'react';
import { login } from '@/utils/authUtils';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter;

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
        router.push("/management/page.jsx");
        console.log("rerouted");
      } catch (error) {
      // Handle form submission logic
      // console.log('Email:', email);
      // console.log('Password:', password);
      }
    };
  
    return (
      <div className="p-4 m-4 border-4 rounded-2xl items-center min-h-40 bg-blue-100">
        <p className="py-4 text-2xl font-bold text-center text-black">Login here</p>
        <div className="w-full max-w-md p-8 mx-auto space-y-8 bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
      </div>
      </div>
    );
  };
  
  export default LoginForm;