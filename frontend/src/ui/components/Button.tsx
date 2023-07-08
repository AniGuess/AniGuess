import cx from 'classnames';

interface ButtonProps extends React.PropsWithChildren {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'flex w-full justify-center rounded-md bg-[#F8B5AB] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FACCC5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F8B5AB]'
      )}
    >
      {children}
    </button>
  );
};
