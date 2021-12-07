// Глаз
const eye = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z'
      stroke='#0B0A0A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
      stroke='#0B0A0A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
// Глаз перечеркнутый
const eyeOff = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.88 14.12C10.1546 14.4147 10.4859 14.6511 10.8538 14.8151C11.2218 14.9791 11.6191 15.0673 12.0219 15.0744C12.4247 15.0815 12.8248 15.0074 13.1984 14.8565C13.5719 14.7056 13.9113 14.481 14.1961 14.1961C14.481 13.9113 14.7056 13.5719 14.8565 13.1984C15.0074 12.8248 15.0815 12.4247 15.0744 12.0219C15.0673 11.6191 14.9791 11.2218 14.8151 10.8538C14.6512 10.4858 14.4147 10.1546 14.12 9.87999L9.88 14.12ZM6.06 17.94C7.7694 19.243 9.8509 19.9649 12 20C19 20 23 12 23 12C21.7561 9.68189 20.0309 7.6566 17.94 6.05999L6.06 17.94ZM14.1 4.23999C13.4117 4.07887 12.7069 3.99833 12 3.99999C5 3.99999 1 12 1 12C1.607 13.1356 2.3309 14.2047 3.16 15.19L14.1 4.23999Z'
      stroke='#0B0A0A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M23 1L1 23' stroke='#0B0A0A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);
// Восклицательный знак
const excPoint = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
      stroke='#E61A1A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M12 8V12' stroke='#E61A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
    <path d='M12 16H12.01' stroke='#E61A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);
// Скрепка
const clip = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21.4403 11.05L12.2503 20.24C11.1244 21.3658 9.59747 21.9983 8.00529 21.9983C6.41311 21.9983 4.88613 21.3658 3.76029 20.24C2.63445 19.1141 2.00195 17.5872 2.00195 15.995C2.00195 14.4028 2.63445 12.8758 3.76029 11.75L12.9503 2.55998C13.7009 1.80942 14.7188 1.38776 15.7803 1.38776C16.8417 1.38776 17.8597 1.80942 18.6103 2.55998C19.3609 3.31054 19.7825 4.32852 19.7825 5.38998C19.7825 6.45144 19.3609 7.46942 18.6103 8.21998L9.41029 17.41C9.03501 17.7853 8.52602 17.9961 7.99529 17.9961C7.46456 17.9961 6.95557 17.7853 6.58029 17.41C6.20501 17.0347 5.99418 16.5257 5.99418 15.995C5.99418 15.4643 6.20501 14.9553 6.58029 14.58L15.0703 6.09998'
      stroke='#0B0A0A'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export { eye, eyeOff, excPoint, clip };
