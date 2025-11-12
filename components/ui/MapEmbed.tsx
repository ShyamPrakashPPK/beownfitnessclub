export default function MapEmbed() {
    return (
        <div className="w-full mx-auto h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] rounded-lg overflow-hidden shadow-2xl">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1951.9441980062466!2d75.4558718386353!3d11.912854621521996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba43b74ae536b5b%3A0xb1c77845a89c3d9f!2sKudukkimotta%2C%20Kerala!5e0!3m2!1sen!2sin!4v1762964792310!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                allowFullScreen
            />
        </div>
    );
}
