export type Event = {
    _id: string
    name: string
    date: Date
    price: number
    desc: string
    briefDesc: string
    avgAttendance: number
    spotsTaken: number
    totalSpots: number
    visible: boolean
    sponsors: Sponsor[]
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
    eventCode: string
    validAdmins: string[]
    levels: SponsorshipLevel[]
    events: Event[]
    exampleInvoice: string
    fundName: string
    FAQ: FAQ[]
    shortName: string
    updatedAt: Date
}

export type Purchase = {
    _id: string
    sponsorId: Sponsor
    events: Event[]
    totalAmount: number
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