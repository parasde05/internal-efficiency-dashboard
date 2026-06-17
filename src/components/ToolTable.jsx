import React from 'react';
import { Button, Tooltip } from '@shashpicious/casa';
import { getLiveDuration } from '../utils/liveDuration';

export default function ToolTable({ tools, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="tools-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Link</th>
            <th>Live Since</th>
            <th>Duration</th>
            <th>Created By</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.id}>
              <td>{tool.name}</td>
              <td>{tool.description}</td>
              <td>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tool-link"
                >
                  {tool.link}
                </a>
              </td>
              <td>{tool.liveDateSince}</td>
              <td>
                <Tooltip content="Time this tool has been live" position="top">
                  <span className="live-duration">{getLiveDuration(tool.liveDateSince)}</span>
                </Tooltip>
              </td>
              <td>{tool.createdBy}</td>
              <td>{tool.department}</td>
              <td>
                {(onEdit || onDelete) && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {onEdit && (
                      <Button variant="subtle" size="sm" onClick={() => onEdit(tool)}>
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button variant="outline" size="sm" onClick={() => onDelete(tool.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
