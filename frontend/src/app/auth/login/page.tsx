'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../api/axiosInstance';
import { AxiosError } from 'axios';
import './LoginPage.css';

interface RoleSpecificData {
  department?: string;
  position?: string;
  permissions?: string[];
  rollNumber?: string;
  year?: string;
  semester?: string;
  mentorId?: string;
  designation?: string;
  expertise?: string[];
  maxStudents?: number;
  organization?: string;
  role?: string;
  projects?: string[];
}

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const [roleData, setRoleData] = useState<RoleSpecificData>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRoleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isSignIn) {
        response = await axiosInstance.post('/auth/login', {
          email,
          password,
        });
      } else {
        // Prepare role-specific data based on selected role
        const registrationData = {
          username,
          email,
          password,
          userType: role,
          ...roleData
        };

        response = await axiosInstance.post('/auth/register', registrationData);
      }

      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('authData', JSON.stringify(response.data));
        router.push(`/dashboard/${response.data.user.userType}`);
        localStorage.setItem('userId', response.data.user.id);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError((axiosError?.response?.data as { message?: string })?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleFields = () => {
    if (!isSignIn) {
      switch (role) {
        case 'admin':
          return (
            <>
              <div className="form-group">
                <label htmlFor="department" style={{ color: 'black' }}>Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={roleData.department || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position" style={{ color: 'black' }}>Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={roleData.position || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
            </>
          );

        case 'student':
          return (
            <>
              <div className="form-group">
                <label htmlFor="rollNumber" style={{ color: 'black' }}>Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={roleData.rollNumber || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="department" style={{ color: 'black' }}>Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={roleData.department || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="year" style={{ color: 'black' }}>Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={roleData.year || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="semester" style={{ color: 'black' }}>Semester</label>
                <input
                  type="text"
                  id="semester"
                  name="semester"
                  value={roleData.semester || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
            </>
          );

        case 'mentor':
          return (
            <>
              <div className="form-group">
                <label htmlFor="department" style={{ color: 'black' }}>Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={roleData.department || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation" style={{ color: 'black' }}>Designation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={roleData.designation || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expertise" style={{ color: 'black' }}>Expertise (comma-separated)</label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={roleData.expertise?.join(',') || ''}
                  onChange={(e) => setRoleData(prev => ({
                    ...prev,
                    expertise: e.target.value.split(',').map(item => item.trim())
                  }))}
                  style={{ color: 'black' }}
                />
              </div>
            </>
          );

        case 'collaborator':
          return (
            <>
              <div className="form-group">
                <label htmlFor="organization" style={{ color: 'black' }}>Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={roleData.organization || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role" style={{ color: 'black' }}>Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={roleData.role || ''}
                  onChange={handleRoleDataChange}
                  required
                  style={{ color: 'black' }}
                />
              </div>
            </>
          );
      }
    }
    return null;
  };

  return (
    <div className="login-container">
      <div className="auth-form">
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Existing email and password fields */}
          <div className="form-group">
            <label htmlFor="email" style={{ color: 'black' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ color: 'black' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ color: 'black' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ color: 'black' }}
            />
          </div>

          {!isSignIn && (
            <>
              <div className="form-group">
                <label htmlFor="username" style={{ color: 'black' }}>Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ color: 'black' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role" style={{ color: 'black' }}>Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setRoleData({}); // Clear role-specific data when role changes
                  }}
                  required
                  style={{ color: 'black' }}
                >
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                  <option value="collaborator">Collaborator</option>
                </select>
              </div>

              {renderRoleFields()}
            </>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-auth">
          <button type="button" onClick={() => {
            setIsSignIn(!isSignIn);
            setError('');
            setRoleData({});
          }}>
            {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;