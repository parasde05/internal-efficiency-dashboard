import React, { useState } from 'react';
import { Input, Modal } from '@shashpicious/casa';

const emptyForm = {
  name: '',
  description: '',
  link: '',
  liveDateSince: '',
  createdBy: '',
  department: '',
};

export default function ToolForm({ tool, onSubmit, onCancel }) {
  const [form, setForm] = useState(tool || emptyForm);
  const [error, setError] = useState('');

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleClick = () => {
    if (!form.name || !form.name.trim()) {
      setError('Tool Name is required');
      return;
    }
    if (!form.description || !form.description.trim()) {
      setError('Description is required');
      return;
    }
    onSubmit(form);
  };

  return (
    <Modal onClose={onCancel} size="medium">
      <div className="tool-form">
        <h3 className="tool-form-title">
          {tool ? 'Edit Tool' : 'Add New Tool'}
        </h3>
        {error && <p className="tool-form-error">{error}</p>}
        <div className="tool-form-fields">
          <Input
            type="text"
            label="Tool Name"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Enter tool name"
            showPlaceholder
          />
          <Input
            type="textArea"
            label="Description"
            value={form.description}
            onChange={handleChange('description')}
            row={3}
            placeholder="Enter description"
            showPlaceholder
          />
          <Input
            type="text"
            label="Link (URL)"
            value={form.link}
            onChange={handleChange('link')}
            placeholder="https://example.com"
            showPlaceholder
          />
          <div className="date-field">
            <label className="date-field-label">Live Date Since</label>
            <input
              type="date"
              className="form-input"
              value={form.liveDateSince}
              onChange={(e) => handleChange('liveDateSince')(e.target.value)}
            />
          </div>
          <Input
            type="text"
            label="Created By"
            value={form.createdBy}
            onChange={handleChange('createdBy')}
            placeholder="Enter name"
            showPlaceholder
          />
          <Input
            type="text"
            label="Department"
            value={form.department}
            onChange={handleChange('department')}
            placeholder="Enter department"
            showPlaceholder
          />
        </div>
        <div className="tool-form-actions">
          <button type="button" className="btn-submit" onClick={handleClick}>
            {tool ? 'Update' : 'Add Tool'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
