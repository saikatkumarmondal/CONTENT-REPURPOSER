import Swal from 'sweetalert2';

export const sweetAlert = (icon: 'success' | 'error' | 'warning' | 'info', title: string) => {
  Swal.fire({
    icon,
    title,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    // Add custom styling here to match your MUI theme
  });
};
