const services = [
  {
    name: "PostgreSQL",
    value: "postgres",
    port: "5432",
    icon: (
      <svg
        className="w-6 h-6 text-blue-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4z" />
        <path d="M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4" />
        <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    value: "mysql",
    port: "3306",
    icon: (
      <svg
        className="w-6 h-6 text-orange-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M3 3h18v18H3V3z" />
        <path d="M12 8v8m-4-4h8" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    value: "mongodb",
    port: "27017",
    icon: (
      <svg
        className="w-6 h-6 text-green-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Redis",
    value: "redis",
    port: "6379",
    icon: (
      <svg
        className="w-6 h-6 text-red-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </svg>
    ),
  },
  {
    name: "Elasticsearch",
    value: "elasticsearch",
    port: "9200",
    icon: (
      <svg
        className="w-6 h-6 text-yellow-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "RabbitMQ",
    value: "rabbitmq",
    port: "5672",
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M12 3v18M3 12h18M5.63 5.63L18.37 18.37M18.37 5.63L5.63 18.37" />
      </svg>
    ),
  },
];

export default services;
