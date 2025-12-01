const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Credenciais do Google Calendar
const SERVICE_ACCOUNT_EMAIL = 'nilton-barber-agenda@nilton-barber-478712.iam.gserviceaccount.com';
const SERVICE_ACCOUNT_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrjBoE5Cf1tWZ5
zpbOv5Hf6/HXIzFLRYZh3UL/Ra7/+plbmJGq9/cWU7hPEY7d/aRqGgfQ5GBagWOz
hojr1yQDqlH9ODi//gcRSk639Tgml9T57MalT+7RE0HpN/nmysIwlYza1WVgyO9W
gqReDXWvEAOeEA5u9nXZpNRf1DjeDlylTVdVhEFGI+QH9FHbHuV0Bt8b+1FctsBQ
Q8xGUxwegRiWKt2XjNQBMm8hWmPLB9RMcsk6Ptz0oHkgJH5kL+hHCEmHL+5AdFju
KndV6Zek03yEBdOd1Zye1uOysBs1fuA1j5XbcbzZhwc5oDM5qe0sTOQBBjNhOqcC
LwD8yzrFAgMBAAECggEAJEKtNkb2xlpVYp5fJKz8G+GO4Tt0XjWAMfv3vyce1kdF
dsXBVqrqzMqd/QKYWQaV5AKED+zSDBdo+GfR1c4INAkiovxpDHYYztgO2xYHjCrQ
TxK0K3nBoGpqZm5ZUaYelW/rEc+FCgf3BSmArku4iiw/o3+/2UcZwoszg90DNzZn
1XFWSWNHlPQayPTRjUjRVg8EtPWnaJS09BAoI4OrgndbKoscoU80NySGXs3aHiro
9FTUHvrJuQ2JUQsTyf9L6zKxHq48djCB9hAo89QEK3pFHPeyagJIHxe0nDqwBVxi
O0YL2mRTxP2NZLCeRJjYxx6Mv7CheMq34IcWbpUQYQKBgQDVoVCU/8An0mktf00H
FNedbHbTCOcohxs7C5F4dKTFGzjDOgpuzu1qKvkMXRwHISliwQGHiH8usETG3XMq
iblYAC9OTFF+Km0JWbub9VWa0XKZ+8M+zIWtT/TgiI60mrti0e5/gvY/jAgPmIoF
9nvtcE2itgP++4gUwk7TSO49JQKBgQDNkhrzixf8V3S72H/YoDGCdOTAFuW/zGqI
qxaM6P4YSfUeqlC+59H16y91By8AeH1XoGTCpbS++wdvJgu/xDYnHa0xCX4mO1TH
/Xi6ybBSfYCrQQJOHkYIHFj/TH94E5ogAtIgYHjAXZ5W4o6GRupH78psRMTpmI5L
33Aib5MlIQKBgQC4mkU//CDYSIKKxk6Rp/kKGAg2JKNb6iQlycFTDbi0eul6ClWp
mzadX7UGcg8eOhHBPHdN3y3H8pn8HrC+OXToDoDScDCbjZ3bTqdIBaCLwCH/3gbB
5Yo+UbGRtW9bsbnrku09UrXoA+GTWIUs0eoVK85qpE6fsEvPZHkpKwRz4QKBgE2r
CwXDIr/TZyZlyP/Wnn4Uniy5Ofq6R/H0+iMpEH+qybLZVIKcYaaRQi/sE+UQoQLP
deJY6y5Q9+EVtdCxWGh0/O+PD5twRTr+WHPyKe0wv8F0YWOUao877qAejfaXKV84
0Z0r9dNwS5e2J3UyK+gcABXh8af0XKbr95j7INQhAoGBANJ7fXOvhfZgkh6OjE5u
iSrBitV2un33XqFslLrpKUAGImN1KS84QSX+0pqCR/7H0VHvKG99mik2NWqdQA1s
vsWZELN8fPG1JLczFqvqCD6gxuat8vbaJMQo2qgMGX2779Of6TWj+dGNSSWAj7V0
6CyxPL+k9tvstisBfQWWtanp
-----END PRIVATE KEY-----`;

// Calendários para cada loja
const CALENDARS = {
    '1': 'loja1.evandrogarcia@gmail.com',
    '2': 'loja2.evandrogarcia@gmail.com'
};

const TIME_ZONE = 'Europe/Lisbon';

async function getCalendarAuth() {
    try {
        const auth = new google.auth.JWT(
            SERVICE_ACCOUNT_EMAIL,
            null,
            SERVICE_ACCOUNT_PRIVATE_KEY,
            ['https://www.googleapis.com/auth/calendar']
        );
        
        await auth.authorize();
        return auth;
    } catch (error) {
        console.error('❌ Erro na autenticação:', error.message);
        throw new Error('Falha na autenticação com Google Calendar');
    }
}

async function createCalendarEvent(bookingData) {
    let auth;
    try {
        auth = await getCalendarAuth();
        const calendar = google.calendar({ version: 'v3', auth });

        const { services, totalPrice, name, email, phone, date, time, store, barberName } = bookingData;

        // Usa o calendário específico da loja
        const calendarId = CALENDARS[store];
        if (!calendarId) {
            throw new Error('Calendário não encontrado para a loja selecionada');
        }

        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + 1);

        const servicesList = services.map(s => `• ${s.name} - €${s.price}`).join('\n');
        const description = `
CLIENTE:
Nome: ${name}
Email: ${email}
Telefone: ${phone}

BARBEIRO:
${barberName}

SERVIÇOS:
${servicesList}

TOTAL: €${totalPrice}

--- Agendado via EVANDRO GARCIA Website ---
        `.trim();

        const event = {
            summary: `💈 ${services.map(s => s.name).join(' + ')} - ${name}`,
            description: description,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: TIME_ZONE,
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: TIME_ZONE,
            },
            colorId: '5',
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 60 },
                ],
            },
        };

        console.log(`📅 Criando evento para ${name} no calendário ${calendarId}`);

        const response = await calendar.events.insert({
            calendarId: calendarId,
            resource: event,
            sendUpdates: 'none',
        });

        return response.data.id;

    } catch (error) {
        console.error('❌ Erro ao criar evento:', error.message);
        
        if (error.code === 403) {
            throw new Error('Sem permissão para acessar o calendário. Verifique as configurações.');
        } else if (error.code === 404) {
            throw new Error('Calendário não encontrado.');
        }
        
        throw new Error(`Falha ao criar agendamento: ${error.message}`);
    }
}

// ===================================
// ROTAS DA API
// ===================================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'EVANDRO GARCIA API está funcionando!',
        timestamp: new Date().toISOString()
    });
});

// Disponibilidade
app.get('/api/availability', async (req, res) => {
    try {
        const { date, store = '1' } = req.query;
        
        if (!date) {
            return res.status(400).json({ 
                success: false,
                error: 'Data não fornecida' 
            });
        }
        
        // Para simplificar, retornamos todos os horários como disponíveis
        const allTimeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
        
        res.json({ 
            success: true,
            busyTimes: [],
            availableSlots: allTimeSlots,
            store: store
        });
        
    } catch (error) {
        console.error('❌ Erro ao verificar disponibilidade:', error.message);
        res.status(500).json({ 
            success: false,
            error: 'Erro ao verificar disponibilidade',
            busyTimes: [],
            availableSlots: []
        });
    }
});

// Agendamento
app.post('/api/bookings', async (req, res) => {
    console.log('📅 Recebendo agendamento:', req.body);
    
    try {
        const { services, totalPrice, name, email, phone, date, time, store, barberName } = req.body;
        
        // Validação básica
        if (!services || !name || !email || !phone || !date || !time || !store || !barberName) {
            return res.status(400).json({ 
                success: false,
                error: 'Dados incompletos',
                message: 'Todos os campos são obrigatórios.' 
            });
        }

        console.log('✅ Dados validados, criando evento...');
        
        const eventId = await createCalendarEvent({
            services,
            totalPrice,
            name,
            email,
            phone,
            date,
            time,
            store,
            barberName
        });
        
        console.log('✅ Evento criado com ID:', eventId);
        
        res.json({ 
            success: true,
            eventId,
            message: 'Agendamento confirmado com sucesso! Você receberá um email de confirmação.' 
        });
        
    } catch (error) {
        console.error('❌ Erro no agendamento:', error.message);
        
        res.status(500).json({ 
            success: false,
            error: 'Erro no agendamento',
            message: error.message
        });
    }
});

// Serviços disponíveis
app.get('/api/services', (req, res) => {
    const services = [
        { name: 'Corte e barba', price: 20.00, duration: '45 min' },
        { name: 'Corte crianças', price: 14.00, duration: '30 min' },
        { name: 'Criação de corte', price: 17.00, duration: '40 min' },
        { name: 'Barba e pé de cabelo', price: 10.00, duration: '25 min' },
        { name: 'Corte a zero', price: 10.00, duration: '20 min' },
        { name: 'Corte e descoloração', price: 45.00, duration: '90 min' },
        { name: 'Corte e barba jovem UAIg', price: 16.00, duration: '40 min' },
        { name: 'Corte e madeixas', price: 45.00, duration: '90 min' },
        { name: 'Corte jovem UAIg', price: 13.00, duration: '30 min' },
        { name: 'Corte e pintura blaka', price: 25.00, duration: '60 min' },
        { name: 'Platinado', price: 60.00, duration: '120 min' },
        { name: 'Corte de Máquina', price: 10.00, duration: '20 min' },
        { name: 'Barba', price: 10.00, duration: '25 min' },
        { name: 'Coloração', price: 30.00, duration: '60 min' },
        { name: 'Corte', price: 15.00, duration: '30 min' }
    ];
    
    res.json({ success: true, services });
});

// Lojas disponíveis
app.get('/api/stores', (req, res) => {
    const stores = {
        '1': { 
            name: 'Loja 1 - Centro', 
            address: 'Largo de Camões n3, 8000-140 Faro',
            phone: '289 042 683',
            whatsapp: '925124104',
            hours: 'Seg-Dom: 9h às 20h',
            feature: 'Studio de Tatuagem incluso'
        },
        '2': { 
            name: 'Loja 2 - Vale da Amoreira', 
            address: 'R. Vale da Amoreira, 8000-429 Faro',
            whatsapp: '928264445',
            hours: 'Seg-Dom: 9h às 20h',
            feature: 'SPA de Massagem incluso'
        }
    };
    
    res.json({ success: true, stores });
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all para SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 Servidor EVANDRO GARCIA rodando na porta ${PORT}`);
    console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🏪 Lojas configuradas: ${Object.keys(CALENDARS).length}`);
    console.log(`✨ Pronto para receber agendamentos!\n`);
});