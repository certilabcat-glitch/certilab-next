/**
 * PITR QUESTION — Renderizador de pregunta individual
 *
 * Soporta todos los tipos: texto, textarea, select, radio,
 * checkbox, fecha, email, telefono, numero, fotografia, pdf,
 * archivo, referencia_catastral, coordenadas, firma.
 *
 * PITR™ — Protocolo de Inspección Técnica Remota
 */

"use client";

import type { InspectionQuestion, ValidationResult } from "@/types/inspection";
import { QuestionType } from "@/types/inspection";
import styles from "./PitrQuestion.module.css";
import { useRef } from "react";

interface PitrQuestionProps {
  question: InspectionQuestion;
  value: unknown;
  validation: ValidationResult | null;
  onChange: (value: unknown, fileMeta?: { name: string; size: number; type: string }) => void;
}

export default function PitrQuestion({
  question,
  value,
  validation,
  onChange,
}: PitrQuestionProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const hasError = validation && !validation.valid;
  const isRequired = question.required;
  const qid = question.id;

  const renderLabel = () => (
    <label htmlFor={qid} className={styles.label}>
      {question.text}
      {isRequired && <span className={styles.required}>*</span>}
    </label>
  );

  const renderHelp = () =>
    question.description && (
      <small className={styles.help}>{question.description}</small>
    );

  const renderError = () =>
    hasError && (
      <span className={styles.error}>{validation!.errors.join(". ")}</span>
    );

  // ── RENDERIZADORES POR TIPO ──

  const renderText = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="text"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? ""}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderTextarea = () => (
    <>
      {renderLabel()}
      <textarea
        id={qid}
        className={`${styles.textarea} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? ""}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
        rows={4}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderSelect = () => (
    <>
      {renderLabel()}
      <select
        id={qid}
        className={`${styles.select} ${hasError ? styles.inputError : ""}`}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      >
        <option value="">-- Seleccionar --</option>
        {question.options?.map((opt) => (
          <option key={opt.id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderRadio = () => (
    <fieldset className={styles.radioGroup}>
      <legend className={styles.legend}>
        {question.text}
        {isRequired && <span className={styles.required}>*</span>}
      </legend>
      {renderHelp()}
      <div className={styles.options}>
        {question.options?.map((opt) => (
          <label key={opt.id} className={styles.radioLabel}>
            <input
              type="radio"
              name={qid}
              value={opt.value}
              checked={String(value ?? "") === opt.value}
              onChange={() => onChange(opt.value)}
              required={isRequired}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {renderError()}
    </fieldset>
  );

  const renderCheckbox = () => (
    <fieldset className={styles.radioGroup}>
      <legend className={styles.legend}>
        {question.text}
        {isRequired && <span className={styles.required}>*</span>}
      </legend>
      {renderHelp()}
      <div className={styles.options}>
        {question.options?.map((opt) => {
          const selected = Array.isArray(value) ? value : [];
          const isChecked = (selected as string[]).includes(opt.value);
          return (
            <label key={opt.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={opt.value}
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    onChange((selected as string[]).filter((v) => v !== opt.value));
                  } else {
                    onChange([...(selected as string[]), opt.value]);
                  }
                }}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
      {renderError()}
    </fieldset>
  );

  const renderEmail = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="email"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? "correo@ejemplo.com"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderTelefono = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="tel"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? "600 000 000"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderNumero = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="number"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? ""}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderFecha = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="date"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderRefCatastral = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="text"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? "9876513VH2797F0001WX"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        required={isRequired}
        maxLength={20}
      />
      {renderHelp()}
      {renderError()}
    </>
  );

  const renderCoordenadas = () => (
    <>
      {renderLabel()}
      <input
        id={qid}
        type="text"
        className={`${styles.input} ${hasError ? styles.inputError : ""}`}
        placeholder={question.placeholder ?? "41.3874, 2.1686"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}
      />
      {renderHelp()}
      <small className={styles.slotHint}>
        📍 Slot de geolocalización disponible (GPS nativo).
      </small>
      {renderError()}
    </>
  );

  const renderArchivo = (
    accept: string,
    label: string,
    maxSizeMB?: number
  ) => (
    <>
      {renderLabel()}
      <div
        className={`${styles.fileUpload} ${hasError ? styles.inputError : ""}`}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
        }}
      >
        <input
          ref={fileRef}
          id={qid}
          type="file"
          accept={accept}
          className={styles.fileInputHidden}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onChange(file.name, {
                name: file.name,
                size: file.size,
                type: file.type,
              });
            }
          }}
        />
        <span className={styles.filePlaceholder}>
          {typeof value === "string" && value
            ? `📎 ${value}`
            : `Haz clic para subir ${label}`}
        </span>
      </div>
      {renderHelp()}
      {maxSizeMB && (
        <small className={styles.help}>Tamaño máximo: {maxSizeMB} MB</small>
      )}
      {renderError()}
    </>
  );

  const renderFotografia = () => renderArchivo("image/*", "fotografía", 10);
  const renderPdf = () => renderArchivo("application/pdf", "PDF", 20);
  const renderArchivoFile = () =>
    renderArchivo(".pdf,.jpg,.png,.xlsx", "archivo", 20);

  const renderFirma = () => (
    <>
      {renderLabel()}
      <div className={styles.firma}>
        <div className={styles.firmaArea}>
          <span>✍️ Área de firma digital</span>
          <small className={styles.slotHint}>
            Slot de firma digital preparado (canvas / touch).
          </small>
        </div>
      </div>
      {renderHelp()}
      {renderError()}
    </>
  );

  // ── MAPA DE TIPOS ──
  const renderers: Record<QuestionType, () => React.ReactNode> = {
    [QuestionType.TEXTO]: renderText,
    [QuestionType.TEXTAREA]: renderTextarea,
    [QuestionType.SELECT]: renderSelect,
    [QuestionType.RADIO]: renderRadio,
    [QuestionType.CHECKBOX]: renderCheckbox,
    [QuestionType.FECHA]: renderFecha,
    [QuestionType.EMAIL]: renderEmail,
    [QuestionType.TELEFONO]: renderTelefono,
    [QuestionType.NUMERO]: renderNumero,
    [QuestionType.FOTOGRAFIA]: renderFotografia,
    [QuestionType.PDF]: renderPdf,
    [QuestionType.ARCHIVO]: renderArchivoFile,
    [QuestionType.REFERENCIA_CATASTRAL]: renderRefCatastral,
    [QuestionType.COORDENADAS]: renderCoordenadas,
    [QuestionType.FIRMA]: renderFirma,
  };

  const renderer = renderers[question.type];
  if (!renderer) {
    return (
      <div className={styles.question}>
        <p className={styles.error}>
          Tipo no soportado: {question.type}
        </p>
      </div>
    );
  }

  return <div className={styles.question}>{renderer()}</div>;
}