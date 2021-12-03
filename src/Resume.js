import React from 'react'

function Resume() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-3'>

                </div>
                <form action="" method="post">
                    <div className='p-3 col-md-3 bg-light'>
                        <div className='mb-3'>
                            <label htmlFor="name" className="form-label">Name </label>
                            <input type="text" id='name' name='name' className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className="form-label">Password </label>
                            <input type="password" id='password' name='password' className="form-control" />
                        </div>
                        <div className="mb-3">
                            <button class="btn btn-outline-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Resume
