from django.db import models
from django.utils.translation import ugettext_lazy as _


class City(models.Model):

    name = models.CharField(_("name"), max_length=64)
    commune_name = models.CharField(_("commune name"), max_length=64)
    district_name = models.CharField(_("district name"), max_length=64)
    province_name = models.CharField(_("province name"), max_length=64)

    class Meta:
        verbose_name = _("city")
        verbose_name_plural = _("cities")

    def __str__(self):
        return f"name: {self.name}"


class MeasuringStation(models.Model):

    name = models.CharField(_("name"), max_length=64)
    gegrLat = models.FloatField(_("latitude"))
    gegrLon = models.FloatField(_("longitude"))

    city = models.ForeignKey(City, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("station")
        verbose_name_plural = _("stations")

    def __str__(self):
        return f"name: {self.name}"


class IndexQuality(models.Model):

    name = models.CharField(_("name"), max_length=64)
    bad = models.IntegerField(_("bad"))
    sufficient = models.IntegerField(_("sufficient"))
    moderate = models.IntegerField(_("moderate"))
    good = models.IntegerField(_("good"))
    very_good = models.IntegerField(_("very_good"))

    class Meta:
        verbose_name = _("index")
        verbose_name_plural = _("indexes")

    def __str__(self):
        return f"name: {self.name}"


class MeasuringStands(models.Model):

    name = models.CharField(_("name"), max_length=64)
    code = models.CharField(_("code"), max_length=64)

    index = models.ForeignKey(IndexQuality, on_delete=models.CASCADE)
    station = models.ForeignKey(MeasuringStation, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("stand")
        verbose_name_plural = _("stands")

    def __str__(self):
        return f"name: {self.name}"


class MeasuringData(models.Model):

    date = models.DateTimeField(_("date"), unique=True)
    value = models.FloatField(_("value"))

    sensor = models.ForeignKey(MeasuringStands, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("measure")
        verbose_name_plural = _("measurement")

    def __str__(self):
        return f"name: {self.date}"
