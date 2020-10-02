from django.urls import path
from django.views.generic import TemplateView
from web_clean_air import views

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("stations/", views.StationsList.as_view(), name="stations"),
    path("cities-stations/", views.CityStations.as_view(), name="cities-station"),
    path(
        "measuring-stands/<int:pk>/", views.MeasuringStandsList.as_view(), name="stands"
    ),
    path(
        "quality-indicators/<int:pk>/",
        views.QualityIndicators.as_view(),
        name="quality",
    ),
    path(
        "measuring-data/<int:pk>/",
        views.MeasuringDataList.as_view(),
        name="data-sensor",
    ),
    # path("/private-station/"),
]
