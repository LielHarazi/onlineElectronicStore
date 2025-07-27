import { Link } from "react-router-dom";
import type { PostUser } from "@/types";

interface UserCardProps {
  user: PostUser;
}

export function UserCard({ user }: UserCardProps) {
  const formatJoinDate = (joinDate: string) => {
    return new Date(joinDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      "Store Manager": "bg-purple-100 text-purple-800",
      "Product Specialist": "bg-blue-100 text-blue-800",
      "Gaming Expert": "bg-green-100 text-green-800",
      "Verified Customer": "bg-yellow-100 text-yellow-800",
      "Tech Advisor": "bg-indigo-100 text-indigo-800",
      "Sales Associate": "bg-pink-100 text-pink-800",
    };

    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full bg-gray-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=random`;
          }}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
              user.role
            )}`}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{user.bio}</p>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span>
            <strong className="text-gray-900">{user.postsCount}</strong> Posts
          </span>
          <span>Joined {formatJoinDate(user.joinDate)}</span>
        </div>
      </div>

      {/* Contact */}
      <div className="pt-4 border-t border-gray-100">
        <Link
          to="/contact"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Contact {user.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}
