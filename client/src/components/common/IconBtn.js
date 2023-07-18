export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-black" : "bg-black text-white"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text- ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-white"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }