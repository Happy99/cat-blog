import React from 'react'

interface ArticleFormFieldProps {
  readonly label: string
  readonly name: 'title' | 'perex' | 'content' | 'imageId'
  readonly type?: 'text' | 'textarea'
  readonly value?: string
  readonly errors?: string[]
  readonly placeholder?: string
  readonly rows?: number
}

const ArticleFormField: React.FC<ArticleFormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  errors,
  placeholder,
  rows,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label required">
        * {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={`form-control ${errors ? 'is-invalid' : ''}`}
          id={name}
          name={name}
          defaultValue={value}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          className={`form-control ${errors ? 'is-invalid' : ''}`}
          id={name}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
        />
      )}
      {errors && <div className="invalid-feedback">{errors.join(', ')}</div>}
    </div>
  )
}

export default ArticleFormField
