export const POST = async <T>(url: string, values: T): Promise<T> => {
    try {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data: T = await res.json();

        console.log(data);

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

//PATCH METHOD

export const PATCH = async <T>(url: string, values: Partial<T>): Promise<T> => {
    try {

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data: T = await res.json();

        console.log(data);

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


// DELETE METHOD


export const DELETE = async <T>(url: string): Promise<T> => {
    try {

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data: T = await res.json();

        console.log(data);

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}