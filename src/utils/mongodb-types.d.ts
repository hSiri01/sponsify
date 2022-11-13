export type Event = {
    _id: string
    name: string
    date: Date
    endDate?: Date
    price: number
    desc: string
    briefDesc: string
    avgAttendance: number
    spotsTaken: number
    totalSpots: number
    visible: boolean
    sponsors: Sponsor[] | number[]
    org: string
}

export type SponsorshipLevel = {
    _id: string
    minAmount: number
    maxAmount: number | null
    name: string
    color: string
    description: string
}

export type FAQ = {
    question: string
    answer: string
}

export type Organization = {
    _id: string
    name: string
    logoImage: string
    address: {
        streetAddress: string
        zip: string
        city: string
        state: string
        country: string
    }
    sponsorCode: string
    validAdmins: string[]
    levels: SponsorshipLevel[]
    events: Event[] | number[]
    exampleInvoice: string
    fundName: string
    FAQ: FAQ[]
    shortName: string
    updatedAt: Date
}

export type Purchase = {
    _id: string
    sponsorID: Sponsor | number
    events: Event[] | number[]
    totalAmount: number
    donationAmount: number | null
    dateSponsored: Date
    org: string
    __v: 0
}

export type Sponsor = {
    _id: string
    firstName: string
    lastName: string
    company: string
    email: string
    sponsorLevel: string
}