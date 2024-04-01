import React, { useState, useEffect } from "react";
import { getLogsAPI } from "../api/logs.api";
import Layout from "../layout/Layout";
import LogsGroup from "../components/logs/LogsGroup";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsData = await getLogsAPI();
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <Layout>
      <div className="">
        <LogsGroup logs={logs}></LogsGroup>
      </div>
    </Layout>
  );
}

export default Logs;
