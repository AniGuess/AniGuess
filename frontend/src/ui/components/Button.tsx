import cx from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean
}

export const Button = ({ children, className, secondary, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(
        className,
        secondary ? 'text-[#F8B5AB] hover:text-white' : 'text-white bg-[#F8B5AB]',
        'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-[#FACCC5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8B5AB]'
      )}
      {...props}
    >
      {children}
    </button>
  );
};
