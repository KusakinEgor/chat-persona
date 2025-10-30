export function PersonaHeader({ avatar, name, description, theme }) {
  return (
    <div
      className="flex items-center gap-4 p-4 border-b"
      style={{
        borderColor: `${theme.primary}30`,
        background: `linear-gradient(90deg, ${theme.primary}15, transparent)`,
      }}
    >
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full shadow-md" />
      <div>
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
