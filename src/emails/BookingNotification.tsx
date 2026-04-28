import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import type { BookingGuest } from "@/app/actions/submitBooking";
import { EVENT } from "@/config/event";

type Props = {
	bookerName: string;
	email: string;
	phone: string;
	guests: BookingGuest[];
	submittedAt: string;
};

export default function BookingNotification({
	bookerName,
	email,
	phone,
	guests,
	submittedAt,
}: Props) {
	const partyLabel = guests.length === 1 ? "person" : "people";
	const previewText = `New booking: ${bookerName} (${guests.length} ${partyLabel})`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={body}>
				<Container style={container}>
					<Heading style={h1}>
						New reservation — {EVENT.name} {EVENT.date}
					</Heading>

					<Section style={card}>
						<Row style={tableRow}>
							<Column style={labelCell}>Name</Column>
							<Column style={valueCell}>{bookerName}</Column>
						</Row>
						<Row style={tableRowAlt}>
							<Column style={labelCell}>Email</Column>
							<Column style={valueCell}>{email}</Column>
						</Row>
						<Row style={tableRow}>
							<Column style={labelCell}>Phone</Column>
							<Column style={valueCell}>{phone}</Column>
						</Row>
						<Row style={tableRowAlt}>
							<Column style={labelCell}>Party size</Column>
							<Column style={valueCell}>{String(guests.length)}</Column>
						</Row>
					</Section>

					<Heading as="h2" style={h2}>
						Dietary requirements
					</Heading>

					<Section style={card}>
						<Row style={tableHeaderRow}>
							<Column style={headerCell}>Role</Column>
							<Column style={headerCell}>Name</Column>
							<Column style={headerCell}>Allergies</Column>
						</Row>
						{guests.map((g, i) => {
							const role = i === 0 ? "Booker" : `Guest ${i + 1}`;
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
									<Column style={valueCell}>{role}</Column>
									<Column style={valueCell}>{g.name}</Column>
									<Column style={valueCell}>{allergyList}</Column>
								</Row>
							);
						})}
					</Section>

					<Text style={timestamp}>Submitted: {submittedAt}</Text>
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
	maxWidth: "600px",
	borderRadius: "8px",
};

const h1 = {
	fontSize: "1.2rem",
	color: "#2d2416",
};

const h2 = {
	fontSize: "1rem",
	color: "#2d2416",
	marginTop: "24px",
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

const timestamp = {
	fontSize: "0.75rem",
	color: "#999",
	marginTop: "24px",
};
