type Customer = {
    title: string;
    first: string;
    last: string;
};

export function toProperNameFormat(customer: Customer): string {
    const { title, first, last } = customer;
    const capitalize = (str: string) => str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    return `${capitalize(title)} ${capitalize(first)} ${capitalize(last)}`;
}
