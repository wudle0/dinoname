import { FormEvent, useEffect, useMemo, useState } from "react";

type DinoProfile = {
	bridge: string;
	trait: string;
	description: string;
	dietType: "육식형" | "초식형";
};

const MBTI_PROFILES: Record<string, DinoProfile> = {
	ISTJ: {
		bridge: "톱스",
		trait: "유교선비",
		description: "규칙과 원칙을 사랑하며, 모두의 질서를 위해 깐깐하게 체크하는 수호자 공룡입니다.",
		dietType: "초식형",
	},
	ISFJ: {
		bridge: "케라",
		trait: "해피간병",
		description:
			"보이지 않는 곳에서도 팀을 챙기며, 묵묵히 모두의 컨디션을 지키는 배려형 공룡입니다.",
		dietType: "초식형",
	},
	INFJ: {
		bridge: "케라",
		trait: "대화중독",
		description: "한마디로 분위기를 읽고 핵심을 짚어내며, 깊은 대화를 사랑하는 직관형 공룡입니다.",
		dietType: "초식형",
	},
	INFP: {
		bridge: "라르",
		trait: "호들갑",
		description: "주로 구석에서 공상을 즐기며, 작은 일에도 크게 놀라는 상상형 공룡입니다.",
		dietType: "초식형",
	},
	INTJ: {
		bridge: "렉토",
		trait: "효율킹콩",
		description: "앞으로 벌어질 일을 미리 계산하며, 효율적인 루트를 설계하는 기획형 공룡입니다.",
		dietType: "육식형",
	},
	INTP: {
		bridge: "노돈",
		trait: "논리광인",
		description:
			"호기심이 생기면 밤새 파고들고, 복잡한 개념도 끝내 구조화해내는 탐구형 공룡입니다.",
		dietType: "육식형",
	},
	ESTP: {
		bridge: "랩터",
		trait: "기습돌진",
		description: "판이 깔리면 제일 먼저 뛰어들고, 현장감으로 승부하는 액션형 공룡입니다.",
		dietType: "육식형",
	},
	ESFP: {
		bridge: "디노",
		trait: "흥폭발",
		description:
			"사람이 모이면 에너지가 두 배가 되고, 분위기를 살리는 데 천부적인 재능이 있는 공룡입니다.",
		dietType: "초식형",
	},
	ENFP: {
		bridge: "드론",
		trait: "꽃밭파티",
		description:
			"새로운 가능성을 보면 눈이 반짝이며, 즉석에서도 신나는 판을 만드는 발상형 공룡입니다.",
		dietType: "초식형",
	},
	ENTP: {
		bridge: "렉스",
		trait: "말대꾸",
		description: "박학다식한 정보력으로 주변을 압도하고, 어떤 토론도 즐기는 반전 매력 공룡입니다.",
		dietType: "육식형",
	},
	ESTJ: {
		bridge: "도논",
		trait: "강력주먹",
		description: "목표를 정하면 팀을 착착 정렬하고, 실행력을 끝까지 끌고 가는 리더형 공룡입니다.",
		dietType: "육식형",
	},
	ESFJ: {
		bridge: "브론토",
		trait: "인싸기만",
		description: "모두가 편안한 분위기를 만들고, 관계를 부드럽게 이어주는 소통형 공룡입니다.",
		dietType: "초식형",
	},
	ENFJ: {
		bridge: "케팔",
		trait: "사탕발림",
		description: "사람의 강점을 금방 발견하고, 함께 성장하도록 동기를 불어넣는 코치형 공룡입니다.",
		dietType: "초식형",
	},
	ENTJ: {
		bridge: "티탄",
		trait: "경주마",
		description: "큰 그림을 그리고 빠르게 의사결정하며, 성과를 현실로 만드는 추진형 공룡입니다.",
		dietType: "육식형",
	},
	ISTP: {
		bridge: "키오",
		trait: "뚝딱수리",
		description: "도구를 쥐면 해결책이 떠오르고, 문제를 손으로 고쳐내는 실전형 공룡입니다.",
		dietType: "육식형",
	},
	ISFP: {
		bridge: "벨로",
		trait: "눈물셀카",
		description:
			"자기만의 감각을 살려 디테일을 완성하고, 조용히 작품을 남기는 아티스트 공룡입니다.",
		dietType: "초식형",
	},
	UNKNOWN: {
		bridge: "미지",
		trait: "정체불명",
		description: "아직 성향을 특정할 수 없지만, 어디로든 진화할 가능성을 품은 미지의 공룡입니다.",
		dietType: "육식형",
	},
	default: {
		bridge: "돈",
		trait: "프로집중",
		description:
			"한 번 목표를 정하면 끝까지 파고들며, 자기만의 리듬으로 진화하는 집중형 공룡입니다.",
		dietType: "육식형",
	},
};

function splitName(name: string) {
	const trimmed = name.trim();
	if (trimmed.length <= 1) {
		return { first: trimmed || "디", last: "노" };
	}
	return {
		first: trimmed.slice(0, 1),
		last: trimmed.slice(-1),
	};
}

function buildDinoName(realName: string, mbti: string) {
	const normalizedMbti = mbti.trim().toUpperCase();
	const profile = MBTI_PROFILES[normalizedMbti] ?? MBTI_PROFILES.default;
	const { first, last } = splitName(realName);
	const dinoName = `${first}${profile.bridge}${last}${profile.trait}사우르스`;

	return {
		dinoName,
		mbti: normalizedMbti || "UNKNOWN",
		profile,
	};
}

export default function App() {
	const [realName, setRealName] = useState("");
	const [selectedMbti, setSelectedMbti] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingEmoji, setLoadingEmoji] = useState<"🦖" | "🦕">("🦖");
	const [submitted, setSubmitted] = useState<{
		realName: string;
		mbti: string;
	} | null>(null);

	const result = useMemo(() => {
		if (!submitted) return null;
		return buildDinoName(submitted.realName, submitted.mbti);
	}, [submitted]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!realName.trim() || !selectedMbti) return;

		setLoading(true);
		window.setTimeout(() => {
			setSubmitted({ realName, mbti: selectedMbti });
			setLoading(false);
		}, 800);
	};

	useEffect(() => {
		if (!loading) {
			setLoadingEmoji("🦖");
			return;
		}

		const intervalId = window.setInterval(() => {
			setLoadingEmoji((prev) => (prev === "🦖" ? "🦕" : "🦖"));
		}, 180);

		return () => window.clearInterval(intervalId);
	}, [loading]);

	return (
		<main className="page">
			{loading && (
				<div
					className="loadingOverlay"
					role="status"
					aria-live="polite"
					aria-label="공룡 이름 생성 중">
					<div className="loadingCard">
						<div className="loadingEmoji" aria-hidden>
							{loadingEmoji}
						</div>
						<p>공룡 이름 추출 중...</p>
					</div>
				</div>
			)}
			<section className="hero">
				<p className="eyebrow">DINO SPECIAL</p>
				<h1>디노작명소</h1>
				<p className="subtitle">귀여운 나만의 공룡이름을 작명해보세요!</p>
			</section>

			<section className="panel">
				<form onSubmit={handleSubmit} className="form">
					<label>
						성함
						<input
							value={realName}
							onChange={(e) => setRealName(e.target.value)}
							placeholder="예: 지훈"
							maxLength={10}
						/>
					</label>
					<div className="mbtiPicker">
						<p>MBTI 선택</p>
						<div className="mbtiGrid" role="radiogroup" aria-label="MBTI 선택">
							{Object.keys(MBTI_PROFILES)
								.filter((key) => key !== "default")
								.map((mbti) => (
									<button
										key={mbti}
										type="button"
										className={`mbtiOption ${selectedMbti === mbti ? "active" : ""}`}
										onClick={() => setSelectedMbti(mbti)}
										aria-pressed={selectedMbti === mbti}>
										{mbti === "UNKNOWN" ? "모름" : mbti}
									</button>
								))}
						</div>
					</div>

					<button type="submit" disabled={loading || !selectedMbti}>
						{loading ? "공룡 DNA 추출 중..." : "공룡 DNA 추출하기"}
					</button>
				</form>

				{result && (
					<article className="card">
						<header className="cardHeader">
							<span className={`badge ${result.profile.dietType}`}>{result.profile.dietType}</span>
							<span className="mbti">{result.mbti === "UNKNOWN" ? "모름" : result.mbti}</span>
						</header>

						<div className="silhouette" aria-hidden>
							{result.profile.dietType === "육식형" ? "🦖" : "🦕"}
						</div>

						<h2>{result.dinoName}</h2>
						<p>{result.profile.description}</p>
					</article>
				)}
			</section>
		</main>
	);
}
