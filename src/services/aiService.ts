// Provider-Independent AI Service Layer with Specific Precision

export interface AIChatInput {
  message: string;
  courseContext?: string;
  lessonContext?: string;
  learningLevel?: string;
  language?: 'en' | 'hi';
}

export interface AIChatOutput {
  id: string;
  role: 'assistant';
  content: string;
  mathMl?: string;
  tableData?: { headers: string[]; rows: string[][] };
  suggestedFollowups: string[];
  uncertaintyWarning?: string;
  specificTermCallout?: {
    term: string;
    definition: string;
  };
}

class AIService {
  public async generateResponse(input: AIChatInput): Promise<AIChatOutput> {
    await new Promise((res) => setTimeout(res, 600));

    const msg = input.message.toLowerCase();

    if (msg.includes('quadratic') || msg.includes('formula') || msg.includes('equation')) {
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `### Specific Quadratic Formula & Discriminant Analysis

For any quadratic equation in standard form:
$$a x^2 + b x + c = 0 \\quad (a \\neq 0)$$

#### 1. Exact Formula Breakdown:
- **$x$**: The variable root values we are solving for.
- **$-b$**: The additive inverse of coefficient $b$.
- **$\\Delta = b^2 - 4ac$**: **The Discriminant** (determines root character).
- **$2a$**: Twice the leading coefficient $a$.

$$\\text{Formula: } x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

#### 2. Specific Discriminant Cases:
- **Case 1 ($\\Delta > 0$)**: Two distinct real roots. Example: $x^2 - 5x + 6 = 0 \\Rightarrow \\Delta = 25 - 24 = 1 > 0 \\Rightarrow x = 2, 3$.
- **Case 2 ($\\Delta = 0$)**: One repeated real root at $x = -b / (2a)$.
- **Case 3 ($\\Delta < 0$)**: Two complex conjugate roots involving $i = \\sqrt{-1}$.`,
        mathMl: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>&#x2212;</mo><mi>b</mi><mo>&#x2213;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>&#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>`,
        specificTermCallout: {
          term: 'Discriminant (Δ = b² - 4ac)',
          definition: 'A scalar value calculated from polynomial coefficients that specifies the exact nature and count of real roots.',
        },
        suggestedFollowups: [
          'Solve x² - 5x + 6 = 0 step-by-step',
          'Explain discriminant Δ < 0 complex roots',
          'Simplify this explanation to Class 8 level',
        ],
      };
    }

    if (msg.includes('kinetic') || msg.includes('energy') || msg.includes('physics')) {
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `### Specific Kinetic & Potential Energy Principles

#### 1. Kinetic Energy Specific Equation:
$$KE = \\frac{1}{2} m v^2$$
- **Mass ($m$)**: Measured in kilograms (kg). Directly proportional.
- **Velocity ($v$)**: Measured in meters/second (m/s). **Velocity is squared ($v^2$)** — doubling velocity quadruples kinetic energy!

#### 2. Potential Energy Specific Equation:
$$PE = m g h$$
- **Gravity ($g$)**: Constant gravitational acceleration ($9.81\\text{ m/s}^2$).
- **Height ($h$)**: Vertical position in meters.

#### 3. Conservation of Mechanical Energy:
$$E_{\\text{total}} = KE + PE = \\text{Constant}$$`,
        specificTermCallout: {
          term: 'Velocity Quadratic Dependence (v²)',
          definition: 'Because velocity is squared in KE = ½ mv², a 2x increase in speed causes a 4x increase in kinetic energy.',
        },
        suggestedFollowups: [
          'Calculate KE for m = 10kg and v = 4m/s',
          'Explain mechanical energy conservation in pendulums',
        ],
      };
    }

    if (msg.includes('wcag') || msg.includes('accessibility') || msg.includes('aria')) {
      return {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `### Specific Web Content Accessibility Guidelines (WCAG 2.2 AA)

#### 1. Precise Contrast Requirements:
- **Normal Text (<18pt)**: Minimum contrast ratio **4.5:1** against background.
- **Large Text (≥18pt or 14pt bold)**: Minimum contrast ratio **3:1**.

#### 2. Precise Touch Target Size:
- **Target Size (WCAG 2.2 SC 2.5.8)**: Minimum **24x24px** area, recommended **44x44px** hit area.

#### 3. Precise Focus Indicator:
- **Focus Visible (WCAG SC 2.4.7)**: Requires a visible focus ring (e.g., 2px offset ring) with contrast ratio ≥ 3:1.`,
        tableData: {
          headers: ['WCAG Success Criterion', 'Exact Specific Requirement', 'Vidya Implementation'],
          rows: [
            ['SC 1.4.3 Contrast', '4.5:1 for normal text', 'High Contrast & Colorblind Themes'],
            ['SC 2.4.7 Focus Visible', 'Visible focus ring indicator', '2px Offset Ring with 4px Glow'],
            ['SC 2.5.8 Target Size', '44x44px minimum hit target', 'Large touch buttons & controls'],
          ],
        },
        suggestedFollowups: [
          'What is the difference between ARIA live polite vs assertive?',
          'How does screen reader heading hierarchy work?',
        ],
      };
    }

    return {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: `### Specific Concept Explanation: ${input.courseContext || 'Learning Topic'}

Here is the targeted breakdown:
1. **Core Definition**: Precise statement of the concept without unnecessary filler.
2. **Mathematical / Logical Rule**: The exact formula or structural rule governing the concept.
3. **Specific Example**: A concrete worked calculation demonstrating the rule in action.

*Click "Listen" to hear this specific section or choose a starter prompt below!*`,
      suggestedFollowups: [
        'Give a step-by-step example',
        'Simplify to Class 8 level',
        'Translate to Hindi',
      ],
      uncertaintyWarning: input.message.length < 5 ? 'Check with your teacher if you need more details.' : undefined,
    };
  }

  public async simplifyText(text: string, level: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 400));

    if (level === 'Class 8 Level') {
      return 'Specific simplified rule: Think of a math formula like a balance scale. Whatever operation (+, -, ×, ÷) you do to the left side, do exactly the same to the right side so the scale stays equal!';
    }
    if (level === 'Very Easy') {
      return 'Very easy rule: Unbox numbers one by one to find the mystery number x.';
    }
    return `Specific Simplified (${level}): ${text.slice(0, 140)}...`;
  }

  public async translateToHindi(text: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 400));
    return `[विशिष्ट हिंदी अनुवाद]: ${text.replace(/Quadratic/g, 'द्विघात').replace(/Equation/g, 'समीकरण').replace(/Formula/g, 'सूत्र')}`;
  }

  public async analyzeQuizPerformance(scorePercent: number, weakTopics: string[]): Promise<{
    summary: string;
    recommendation: string;
  }> {
    await new Promise((res) => setTimeout(res, 500));
    if (scorePercent >= 80) {
      return {
        summary: `Specific Assessment Score: ${scorePercent}%. High precision demonstrated in formula application and root calculations.`,
        recommendation: `Targeted next step: Proceed to Chapter 4.3 Advanced Polynomial Operations.`,
      };
    }
    return {
      summary: `Specific Assessment Score: ${scorePercent}%. Specific practice required on ${weakTopics.join(', ')}.`,
      recommendation: `Targeted revision: Re-examine Lesson 1.2 on Discriminant Δ < 0 boundary cases and solve practice set #4.`,
    };
  }
}

export const aiService = new AIService();
