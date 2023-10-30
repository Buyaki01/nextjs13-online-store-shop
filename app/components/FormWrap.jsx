const FormWrap = ({ children }) => {
  return (
    <div className="
      min-h-fit
      h-full
      flex
      justify-center
    "
    >
      <div
        className="
          max-w-[600px]
          w-full
          flex
          flex-col
          gap-6
          items-center
          shadow-xl
          shadow-slate-200
          rounded-md
          my-8
          p-4
          md:p-8
        "
      >
        {children}
      </div>
    </div>
  )
}

export default FormWrap