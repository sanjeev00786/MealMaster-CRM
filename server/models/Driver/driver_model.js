const supabase = require('../../config/supabaseClient');

exports.createDriver = async (data) => {
    console.log('Received Data:', data);

    try {
        const {
            provider_id,
            name,
            email_id,
            contact,
            photo_url,
            address,
            latitude,
            longitude,
            dob,
            login_token,
            driver_status,
            socket_token,
        } = data;

        console.log('Extracted Data:', {
            provider_id,
            name,
            email_id,
            contact,
            photo_url,
            address,
            latitude,
            longitude,
            dob,
            login_token,
            driver_status,
            socket_token,
        });

        const { error } = await supabase
            .from('drivers')
            .insert([
                {
                    provider_id,
                    name,
                    email_id,
                    contact,
                    photo_url,
                    address,
                    latitude,
                    longitude,
                    dob,
                    login_token,
                    driver_status,
                    socket_token,
                },
            ]);

        if (error) {
            console.error('Supabase Insert Error:', error.message);
            throw error;
        }

        console.log('Data inserted successfully.');

        // Assuming successful insertion if no error is thrown
        return { message: 'Driver created successfully' };
    } catch (error) {
        console.error('Result from creating driver:', error.message);
        throw new Error('Failed to create driver');
    }
};