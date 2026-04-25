import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import ReservaForm from "../forms/ReservaForm";
import type { DictType } from "@/app/[lang]/dictionaries";

afterEach(cleanup);

const dict: DictType["reserva"] = {
	eyebrow: "Únete",
	heading: "Reserva tu lugar para el 6 de Mayo",
	subtext: "Compártenos tu información para asistir a la próxima junta.",
	fields: {
		nombre: "Nombre",
		apellido: "Apellido",
		email: "Email",
		celular: "Celular",
		alergia: "¿Tienes alergia alimenticia?",
		extras: "¿Quieres registrar a más personas?",
		required: "(Requerido)",
	},
	placeholders: {
		nombre: "Tu nombre",
		apellido: "Tu apellido",
		email: "tu@correo.com",
		celular: "7700 900 000",
	},
	alergiaOptions: {
		placeholder: "Selecciona una opción",
		ninguna: "No, ninguna",
		gluten: "Gluten",
		lactosa: "Lactosa",
		frutosSecos: "Frutos secos",
		mariscos: "Mariscos",
		otra: "Otra (lo detallo en el correo)",
	},
	extrasOptions: {
		solo: "No, solo yo",
		mas1: "Sí, 1 persona más",
		mas2: "Sí, 2 personas más",
		mas3: "Sí, 3 personas más",
		mas4: "Sí, 4 personas más",
	},
	consent: {
		pre: "Acepto la ",
		linkLabel: "política de cancelación",
		post: " y autorizo a La Junta a contactarme con detalles del menú, fecha y ubicación del evento.",
	},
	submit: "Enviar información",
	successTitle: "¡Gracias!",
	successBody: "Hemos recibido tu información. Te enviaremos un correo de confirmación con las opciones de menú a la brevedad.",
};

async function fillRequiredFields(form: HTMLElement) {
	await userEvent.type(within(form).getByLabelText(/nombre/i), "Ana");
	await userEvent.type(within(form).getByLabelText(/apellido/i), "Pérez");
	await userEvent.type(within(form).getByLabelText(/email/i), "ana@test.com");
	await userEvent.type(within(form).getByLabelText(/celular/i), "7700900000");
	await userEvent.selectOptions(
		within(form).getByLabelText(/alergia/i),
		"ninguna",
	);
}

function setup() {
	const { container } = render(<ReservaForm dict={dict} />);
	const form = container.querySelector("form") as HTMLElement;
	return { form };
}

describe("ReservaForm", () => {
	it("renders the form by default", () => {
		setup();
		expect(
			screen.getByRole("button", { name: /enviar información/i }),
		).toBeDefined();
	});

	it("submit button is disabled until checkbox is checked", () => {
		setup();
		const button = screen.getByRole("button", {
			name: /enviar información/i,
		}) as HTMLButtonElement;
		expect(button.disabled).toBe(true);
	});

	it("submit button enables after filling all fields and checking the checkbox", async () => {
		const { form } = setup();
		await fillRequiredFields(form);
		await userEvent.click(within(form).getByRole("checkbox"));
		const button = screen.getByRole("button", {
			name: /enviar información/i,
		}) as HTMLButtonElement;
		expect(button.disabled).toBe(false);
	});

	it("submit button disables again if checkbox is unchecked", async () => {
		const { form } = setup();
		await fillRequiredFields(form);
		const checkbox = within(form).getByRole("checkbox");
		await userEvent.click(checkbox);
		await userEvent.click(checkbox);
		const button = screen.getByRole("button", {
			name: /enviar información/i,
		}) as HTMLButtonElement;
		expect(button.disabled).toBe(true);
	});

	it("shows success message after form submission", async () => {
		const { form } = setup();
		await fillRequiredFields(form);
		await userEvent.click(within(form).getByRole("checkbox"));
		await userEvent.click(
			screen.getByRole("button", { name: /enviar información/i }),
		);
		expect(screen.getByText(/gracias/i)).toBeDefined();
	});

	it("hides the form after successful submission", async () => {
		const { form } = setup();
		await fillRequiredFields(form);
		await userEvent.click(within(form).getByRole("checkbox"));
		await userEvent.click(
			screen.getByRole("button", { name: /enviar información/i }),
		);
		expect(document.querySelector("form")).toBeNull();
	});
});
