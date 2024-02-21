


export default function ContactPage() {
    return (

        <div className='mb-10 relative bg-fixed'>

            <div className="container mx-auto">
                <div className="w-64 h-1 bg-gradient-to-r from-[#CA0808] to-[#0FC0E7] mx-auto mb-10 mt-24"></div>
                <div className="grid grid-flow-row lg:grid-cols-12 gap-5 ">
                    <div className="lg:col-span-7 mx-8 bg-secondary1 rounded-lg  relative">
                        <div className="p-5 bg-white rounded-lg shadow-xl">
                            <h4 className="text-[46px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#081FF0] via-sky-300 to-[#13D1D1] mb-5">Mee Need Repair</h4>
                            <p className="text-black font-black	 flex gap-3 mt-4">
                                Address: 46/3 Ratchanikun Rd, Mueang Nakhon Ratchasima District, Nakhon Ratchasima 30000
                            </p>
                            <p className="text-black font-black	 flex gap-3 mt-4">
                                Email: Me.Prompt.Tec@gmail.com
                            </p>
                            <p className="text-black font-black	 flex gap-3 mt-4">
                                Phone: 099-164-1044,065-821-4605
                            </p>
                            <p className="text-black  font-black	flex gap-3 mt-4">
                                Facebook: Mee Need Repair
                            </p>

                        </div>
                        

                    </div>
                    <div className="lg:col-span-5 mx-8">
                        <iframe className="rounded-lg w-full"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7708.821755171245!2d102.102017!3d14.96988!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31194d8e8317c351%3A0xd84c052ad6cf5c55!2sME%20PROMPT%20TECHNOLOGY!5e0!3m2!1sen!2sth!4v1691552612979!5m2!1sen!2sth"
                            height="400"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>


        </div>

    )
}