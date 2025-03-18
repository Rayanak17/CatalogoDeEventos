export function Button({ children, onClick, className = "", ariaLabel }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
      onClick={onClick} // Manipulador de evento
      aria-label={ariaLabel} // Acessibilidade
    >
      {children}
    </button>
  );
}
