import { Brain, Lightbulb, ArrowRight } from "lucide-react";

function AIInsights({ insights }) {
  return (
    <section className="ai-section">

      <div className="section-header">

        <div>

          <h2>AI Business Assistant</h2>

          <p>
            Smart recommendations to help grow LUCK-G'S.
          </p>

        </div>

      </div>

      {insights.length === 0 ? (

        <div className="ai-empty">

          <Brain size={42} />

          <h3>No Insights Available</h3>

          <p>
            As your customer database grows,
            AI recommendations will appear here.
          </p>

        </div>

      ) : (

        <div className="ai-grid">

          {insights.map((item, index) => (

            <div
              key={index}
              className="ai-card"
            >

              <div className="ai-icon">

                <Lightbulb size={22} />

              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.message}
              </p>

              <div className="ai-action">

                <span>

                  {item.action}

                </span>

                <ArrowRight size={16} />

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default AIInsights;