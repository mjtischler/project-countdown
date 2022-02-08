export const GetDaysRemaining = async (endDate) => {
    try {
        const response = await fetch('/daysremaining', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ endDate })
        });

        const responseJson = await response.json();
        const { daysRemaining } = responseJson;

        return daysRemaining;
    } catch (err) {
        console.error("GetDaysRemaining(): " + err);
    }
};
