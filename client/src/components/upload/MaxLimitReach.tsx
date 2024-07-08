
function MaxLimitReach() {
  return (
    <div className='w-[272px] md:w-[528px] h-[74px] rounded border py-6 px-10 bg-[#FAFAFA] border-[#E5E5E5] text-center flex flex-col justify-center file:items-center'>
        <p className='text-base font-semibold text-red-600'>You've reached the image limit</p>
        <p className='text-xs'>Remove one or more to upload more images.</p>
    </div>
  )
}

export default MaxLimitReach