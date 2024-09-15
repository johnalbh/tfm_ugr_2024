import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface JsonViewerProps {
	data: any
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
	return (
		<div
			style={{
				maxHeight: '400px',
				overflowY: 'auto',
				border: '1px solid #ddd',
				padding: '10px',
				borderRadius: '5px',
			}}>
			<SyntaxHighlighter language="json">
				{JSON.stringify(data, null, 2)}
			</SyntaxHighlighter>
		</div>
	)
}

export default JsonViewer
