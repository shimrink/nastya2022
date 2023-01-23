import sanityClient from "@sanity/client"

export default sanityClient({
	projectId: 'v9h0nymc',
	dataset: 'production',
	apiVersion: '2021-10-21',
	useCdn: true,
})