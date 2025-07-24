import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  product: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    review:
      "Absolutely amazing product! Exceeded all my expectations. The quality is outstanding and it arrived exactly as described.",
    product: "iPhone 15 Pro",
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    rating: 5,
    review:
      "Great laptop for development work. Fast, reliable, and the battery life is impressive. Highly recommend!",
    product: "MacBook Air M3",
    date: "2024-01-12",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "ER",
    rating: 4,
    review:
      "Love the camera quality and the S Pen functionality. Perfect for my creative work and daily tasks.",
    product: "Galaxy S24 Ultra",
    date: "2024-01-10",
  },
  {
    id: "4",
    name: "David Thompson",
    avatar: "DT",
    rating: 5,
    review:
      "Solid Windows laptop with excellent build quality. Great for productivity and multitasking.",
    product: "Surface Laptop 5",
    date: "2024-01-08",
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar: "LP",
    rating: 5,
    review:
      "Perfect tablet for teaching and presentations. The display is crisp and the performance is smooth.",
    product: "iPad Air",
    date: "2024-01-05",
  },
  {
    id: "6",
    name: "Alex Kumar",
    avatar: "AK",
    rating: 4,
    review:
      "Good phone with excellent AI features. Camera is great for photography enthusiasts.",
    product: "Pixel 8 Pro",
    date: "2024-01-03",
  },
  {
    id: "7",
    name: "Maria Santos",
    avatar: "MS",
    rating: 4,
    review:
      "Great tablet for digital art and note-taking. The S Pen is very responsive and accurate.",
    product: "Galaxy Tab S9",
    date: "2024-01-01",
  },
  {
    id: "8",
    name: "James Wilson",
    avatar: "JW",
    rating: 5,
    review:
      "Excellent sound quality and noise cancellation. Perfect for music and calls.",
    product: "AirPods Pro 2",
    date: "2023-12-28",
  },
  {
    id: "9",
    name: "Anna Taylor",
    avatar: "AT",
    rating: 3,
    review:
      "Decent product but had some minor issues with connectivity. Customer service was helpful though.",
    product: "Surface Laptop 5",
    date: "2023-12-25",
  },
  {
    id: "10",
    name: "Robert Kim",
    avatar: "RK",
    rating: 5,
    review:
      "Outstanding build quality and performance. This laptop handles everything I throw at it effortlessly.",
    product: "MacBook Air M3",
    date: "2023-12-22",
  },
];

export function ReviewCard() {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500 text-lg">
          ★
        </span>
      );
    }

    // Fill remaining with empty stars if less than 5
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <span key={i} className="text-gray-300 text-lg">
          ★
        </span>
      );
    }

    return stars;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return "text-green-600";
    if (rating >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-white">Customer Reviews</h1>
        <p className="text-white text-lg">
          See what our customers say about our products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Reviewed on {new Date(review.date).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span
                  className={`font-bold text-lg ${getRatingColor(
                    review.rating
                  )}`}
                >
                  {review.rating}/5
                </span>
              </div>

              <CardDescription className="font-medium text-blue-600">
                {review.product}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-700 leading-relaxed">"{review.review}"</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="bg-gray-100 rounded-lg p-6 inline-block">
          <h3 className="text-xl font-semibold mb-2">Overall Rating</h3>
          <div className="text-3xl font-bold text-green-600">
            {(
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)}
            /5
          </div>
          <p className="text-gray-600 mt-2">
            Based on {reviews.length} reviews
          </p>
        </div>
      </div>
    </div>
  );
}
