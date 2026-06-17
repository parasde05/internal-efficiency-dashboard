import React from 'react';
import { Button, Tooltip } from '@shashpicious/casa';
import { getLiveDuration } from '../utils/liveDuration';

export default function ToolCard({ tool, onEdit, onDelete }) {
  return (
    <div className="tool-card">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <a
        className="tool-link"
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tool.link}
      </a>
      <div className="tool-meta">
        <span>Live since: {tool.liveDateSince}</span>
        <Tooltip content="Time this tool has been live" position="top">
          <span className="live-duration">⏱ {getLiveDuration(tool.liveDateSince)}</span>
        </Tooltip>
        <span>By: {tool.createdBy}</span>
        <span>{tool.department}</span>
      </div>
      {(onEdit || onDelete) && (
        <div className="tool-actions">
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
    </div>
  );
}
