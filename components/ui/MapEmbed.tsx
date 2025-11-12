// app/components/MapEmbed.js (or similar)
export default function MapEmbed() {
    return (
        <div style={{ width: "100%", height: "300px", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.070244962!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbaa7d8c3%3A0x8b8e5f91a66ef1c!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1695560000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
