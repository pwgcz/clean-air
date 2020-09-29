from django.contrib import admin
from .models import IndexQuality, MeasuringStation, City, MeasuringStands, MeasuringData
from django.contrib.auth.models import Group, User

admin.site.unregister(User)
admin.site.unregister(Group)


class IndexQualityAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"


class MeasuringStationAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"


class MeasuringStandsAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"


class MeasuringDataAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"


class CityAdmin(admin.ModelAdmin):
    empty_value_display = "unknown"


admin.site.register(IndexQuality, IndexQualityAdmin)
admin.site.register(MeasuringStation, MeasuringStationAdmin)
admin.site.register(MeasuringStands, MeasuringStandsAdmin)
admin.site.register(MeasuringData, MeasuringDataAdmin)
admin.site.register(City, CityAdmin)
