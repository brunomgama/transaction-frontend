
export const getCustomer = async () => {
    try {
        const res = await fetch('http://localhost:8080/customer/20', {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Bank Accounts");
        }

        return res.json();
    } catch (error) {
        console.error("Error loading Bank Accounts", error);
        return { bank: [] };
    }
};
