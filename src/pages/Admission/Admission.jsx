import React from 'react'
import AdmissionBanner from './AdmissionBanner'
import AdmissionForm from './AdmissionForm'
import Facilities from './facilities'

const Admission = () => {
    return (
        <>
            <AdmissionBanner />
            <AdmissionForm />
            <Facilities />
        </>
    )
}

export default Admission