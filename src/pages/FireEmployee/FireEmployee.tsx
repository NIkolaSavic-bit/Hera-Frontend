import React, { useState } from "react";

interface Employee {
  id: string;
  name: string;
}

const FireEmployeeForm: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "John Doe"},
    { id: "2", name: "Jane Smith"},
    { id: "3", name: "Bob Johnson"}
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee));
      setSelectedEmployee("");
      setReason("");
      setSuccess(true);
      setIsSubmitting(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="fire-employee-form">
      <h2>Fire Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee">Select Employee</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            required
          >
            <option value="">-- Select an employee --</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Reason for Termination</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Enter the reason for termination..."
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Terminate Employment"}
        </button>
        
        {success && (
          <div className="success-message">
            Employee terminated successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default FireEmployeeForm;