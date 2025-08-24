// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      <section className="space-y-6 text-lg leading-relaxed text-gray-700">
        <p>
          Natural disasters such as floods, earthquakes, cyclones, and wildfires
          cause widespread destruction, leaving communities without access to
          critical resources and services. In such times, families and
          individuals struggle to find shelter, food, medical aid, and reliable
          communication.
        </p>

        <p>
          <span className="font-semibold">CareConnect</span> was built to bridge
          this gap. Our platform helps affected communities access vital
          resources quickly while enabling relief organizations to coordinate
          effectively. By ensuring transparent distribution of aid, we aim to
          reduce chaos and bring timely help to those who need it most.
        </p>

        <p>
          We believe in the power of technology and collective action to save
          lives during crises. CareConnect connects survivors, volunteers,
          donors, and relief workers on one platform — making disaster response
          faster, more efficient, and more humane.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          To create a reliable and transparent system for resource allocation
          during natural disasters, ensuring that every person in need receives
          timely help and support.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          A world where no disaster victim is left without access to essential
          aid, and communities can recover faster through collaborative
          technology-driven solutions.
        </p>
      </section>
    </main>
  );
}
