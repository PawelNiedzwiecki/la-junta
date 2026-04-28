import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import type { BookingGuest } from "@/app/actions/submitBooking";
import { EVENT } from "@/config/event";

type Props = {
	firstName: string;
	guests: BookingGuest[];
};

export default function BookingConfirmation({ firstName, guests }: Props) {
	const bookerName = guests[0]?.name ?? firstName;

	return (
		<Html>
			<Head />
			<Preview>Your reservation for {EVENT.name} is confirmed</Preview>
			<Body style={body}>
				<Container style={container}>
					<Heading style={h1}>Thank you, {firstName}!</Heading>
					<Text style={subtitle}>
						We've received your reservation for <strong>{EVENT.name}</strong>.
					</Text>

					<Section style={card}>
						<Row style={tableRow}>
							<Column style={labelCell}>Date</Column>
							<Column style={valueCell}>{EVENT.dateEn}</Column>
						</Row>
						<Row style={tableRowAlt}>
							<Column style={labelCell}>Time</Column>
							<Column style={valueCell}>{EVENT.time}</Column>
						</Row>
						<Row style={tableRow}>
							<Column style={labelCell}>Location</Column>
							<Column style={valueCell}>
								{EVENT.location} — exact address sent closer to the date
							</Column>
						</Row>
						<Row style={tableRowAlt}>
							<Column style={labelCell}>Party size</Column>
							<Column style={valueCell}>
								{guests.length} {guests.length === 1 ? "person" : "people"}
							</Column>
						</Row>
					</Section>

					<Heading as="h2" style={h2}>
						Dietary requirements
					</Heading>

					<Section style={card}>
						<Row style={tableHeaderRow}>
							<Column style={headerCell}>Name</Column>
							<Column style={headerCell}>Allergies</Column>
						</Row>
						{guests.map((g, i) => {
							const allergyList =
								g.allergies.filter((a) => a !== "other").length > 0 ||
								g.otherAllergy
									? [
											...g.allergies.filter((a) => a !== "other"),
											...(g.otherAllergy ? [g.otherAllergy] : []),
										].join(", ")
									: "None";
							return (
								<Row key={i} style={i % 2 === 0 ? tableRow : tableRowAlt}>
									<Column style={valueCell}>{g.name || bookerName}</Column>
									<Column style={valueCell}>{allergyList}</Column>
								</Row>
							);
						})}
					</Section>

					<Hr style={hr} />

					<Text style={footer}>
						We'll be in touch with menu options and payment details shortly.
						Questions? Reply to this email or write to{" "}
						<Link href={`mailto:${EVENT.notificationEmail}`} style={link}>
							{EVENT.notificationEmail}
						</Link>
						.
					</Text>
					<Text style={brandFooter}>La Junta · London</Text>
				</Container>
			</Body>
		</Html>
	);
}

const body = {
	backgroundColor: "#f9f4ec",
	fontFamily: "sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "24px",
	maxWidth: "560px",
	borderRadius: "8px",
};

const h1 = {
	fontSize: "1.4rem",
	color: "#2d2416",
	marginBottom: "4px",
};

const h2 = {
	fontSize: "1rem",
	color: "#2d2416",
	marginTop: "24px",
};

const subtitle = {
	color: "#666",
	marginTop: "0",
};

const card = {
	borderRadius: "8px",
	overflow: "hidden",
	border: "1px solid #e5d9c5",
};

const tableHeaderRow = {
	backgroundColor: "#2d2416",
};

const tableRow = {
	backgroundColor: "#f9f4ec",
};

const tableRowAlt = {
	backgroundColor: "#f0e6d3",
};

const labelCell = {
	padding: "8px 12px",
	fontWeight: "600",
	color: "#2d2416",
	width: "140px",
};

const headerCell = {
	padding: "8px 12px",
	fontWeight: "600",
	color: "#f0b429",
};

const valueCell = {
	padding: "8px 12px",
	color: "#2d2416",
};

const hr = {
	borderColor: "#e5d9c5",
	margin: "24px 0",
};

const footer = {
	fontSize: "0.875rem",
	color: "#666",
};

const brandFooter = {
	fontSize: "0.75rem",
	color: "#999",
	marginTop: "32px",
};

const link = {
	color: "#2d2416",
};
