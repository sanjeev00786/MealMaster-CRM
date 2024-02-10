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
            return { success: false, message: 'Failed to create driver' }
        }

        return { success: true, message: 'Driver created successfully' };
    } catch (error) {
        console.error('Result from creating driver:', error.message);
        throw new Error('Failed to create driver');
    }
};

exports.updateDriver = async (data) => {
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
            driver_id
        } = data;

        const { error } = await supabase
            .from('drivers')
            .update([
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
                    socket_token
                },
            ]).eq('driver_id', driver_id);

        if (error) {
            console.error('Supabase Insert Error:', error.message);
            return { success: true, message: 'Failed to update driver' };
        }

        console.log('Data updated successfully.');

        return { success: true, message: 'Driver updated successfully' };
    } catch (error) {
        console.error('Result from update driver:', error.message);
        throw new Error('Failed to update driver');
    }
};

exports.deleteDriver = async (driver_id) => {
    console.log('Received Data:', { driver_id });

    try {
        const { error } = await supabase
            .from('drivers')
            .delete()
            .eq('driver_id', driver_id);

        if (error) {
            console.error('Supabase Delete Error:', error.message);
            return { success: false, message: 'Failed to delete driver' }
        }

        console.log('Data deleted successfully.');

        return { success: true, message: 'Driver deleted successfully' };
    } catch (error) {
        console.error('Result from delete driver:', error.message);
        throw new Error('Failed to delete driver');
    }
};

exports.getDriver = async (provider_id) => {
    console.log('Received Data:', { provider_id });

    try {
        const { data, error } = await supabase
            .from('drivers')
            .select('*')
            .eq('provider_id', provider_id);

        if (error) {
            console.error('Supabase Delete Error:', error.message);
            return { success: false, message: 'Failed to fetch drivers' }
        }

        console.log();

        return { success: true, message: 'Driver fetched successfully', data };
    } catch (error) {
        console.error('Failed to fetch drivers:', error.message);
        throw new Error('Failed to fetch drivers');
    }
};