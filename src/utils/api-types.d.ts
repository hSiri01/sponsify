import {Event, SponsorshipLevel, FAQ, Organization, Purchase, Sponsor} from './mongodb-types'

export type GetAllFaq = FAQ[]
export type UpdateFaq = string
export type CreateFaq = string
export type DeleteFaq = string
export type GetAllLevels = SponsorshipLevel[]
export type GetLevelByAmount = SponsorshipLevel
export type UpdateLevel = string
export type CreateLevel = string
export type DeleteLevel = string
export type GetEnabledEvents = Event[]
export type GetAllEvents = Event[]
export type CreateEvent = { status: '200' | '500' }
export type UpdateEvent = { status: '200' | '400' | '500' }
export type DeleteEvent = { status: '200' | '400' | '500' }
export type VerifySponsorCode = {
    name: string
    shortName: string
} | {}
export type CheckoutEvents = { status: '200' | '500' } | UpdateEvent
export type GetAllPurchasedEvents = Event[]
export type CreateSponsor = undefined
export type GetAllSponsors = {
    sponsorLevel: SponsorshipLevel,
    company: string,
    totalAmount: number,
    _id: string
}[]
export type GetOrgInfo = Organization
export type UpdateOrgInfo = { status: '400' } | undefined
export type GetValidAdmins = string[]
export type GetEventCode = string
export type GetLogo = {
    logoImage: string
    _id: string
}
export type CreateLogo = string
export type SendCheckoutEmail = undefined

