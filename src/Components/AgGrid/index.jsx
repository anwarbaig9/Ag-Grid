import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  colorSchemeLightCold,
  iconSetMaterial,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { SideBarModule, FiltersToolPanelModule } from "ag-grid-enterprise";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColumnMenuModule, ContextMenuModule } from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  AllCommunityModule,
  SideBarModule,
  FiltersToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
]);
const styles = {
  container: {
    width: "90%",
    height: "600px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px hsla(0, 0.00%, 0.00%, 0.77)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", 
    marginTop:"150px"
  },
  filterLabel: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
  },
};
const paginationPageSize = 100;
const paginationPageSizeSelector = [100, 200, 300, 400, 500];
const myTheme = themeQuartz
  .withParams({
    spacing: 12,
    accentColor: "#71bb9c",
    headerBackgroundColor: "rgba(28, 62, 80, 0.24)",
    headerTextColor: "rgb(21, 24, 0)",
    selectedRowBackgroundColor: "rgba(124, 116, 47, 0.1)",
  })
  .withPart(iconSetMaterial)
  .withPart(colorSchemeLightCold);
const GridExample = () => {
  const [rowData, setRowData] = useState([]);
  const colDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        filterParams: { buttons: ["reset", "apply"] },
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
      },
      {
        headerName: "Name",
        field: "name",
        filterParams: { buttons: ["reset", "apply"] },
      },
      {
        headerName: "Email",
        field: "email",
        filterParams: { buttons: ["reset", "apply"] },
      },
      {
        headerName: "Title",
        field: "body",
        filterParams: { buttons: ["reset", "apply"] },
      },
    ],
    []
  );
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      editable: true,
    }),
    []
  );
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const sideBarConfig = useMemo(
    () => ({
      toolPanels: [
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
        },
      ],
      defaultToolPanel: "filters",
    }),
    []
  );
  return (
    <div style={styles.container} className="ag-theme-material">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        theme={myTheme}
        sideBar={sideBarConfig}
        rowSelection="multiple"
      />
    </div>
  );
};
export default GridExample;
