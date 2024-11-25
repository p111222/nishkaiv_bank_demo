import React from 'react'

const PageTitle = ({ titleText, titleIcon }) => {
    return (
        <div className='mb-2'>
            <div className="flex items-center gap-2">
                <>
                    {titleIcon}
                </>
                <h1 className='text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight'>{titleText}</h1>
            </div>
            
        </div>
    )
}

export default PageTitle